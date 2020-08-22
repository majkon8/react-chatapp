import React, {
  useState,
  useRef,
  MouseEvent,
  useEffect,
  ChangeEvent,
  MutableRefObject,
} from "react";
import "./UserSettings.scss";
import { useOuterClick } from "../../hooks/hooks";
import api from "../../api/api";
import { CircularProgress } from "@material-ui/core";
// redux
import { connect, ConnectedProps } from "react-redux";
import { updateUserAccountDetails } from "../../redux/actions/userActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ user: state.user });
const mapActionsToProps = { updateUserAccountDetails };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function UserSettings({ user, updateUserAccountDetails }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const fileInputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const innerRef = useOuterClick((event: MouseEvent<HTMLElement>) => {
    const eventTargetClassName = (event.target as Element).className;
    if (
      typeof eventTargetClassName === "string" &&
      eventTargetClassName.includes("ignore-outer-click")
    )
      return;
    setIsOpen(false);
  });

  useEffect(() => {
    if (!isOpen) {
      setIsEditingUsername(false);
      setIsEditingBio(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (user.authenticatedUser?.username)
      setNewUsername(user.authenticatedUser.username);
    if (user.authenticatedUser?.bio) setNewBio(user.authenticatedUser.bio);
  }, [user.authenticatedUser]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const editUsername = () => setIsEditingUsername(true);

  const editBio = () => setIsEditingBio(true);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: { (value: string): void }
  ) => setState(event.target.value);

  const hasMadeChange = () =>
    (newUsername && user.authenticatedUser?.username !== newUsername) ||
    (user.authenticatedUser?.bio && user.authenticatedUser.bio !== newBio) ||
    newImageUrl;

  const handleUpdate = () => {
    const bioToSend = isEditingBio ? newBio : user.authenticatedUser!.bio;
    const usernameToSend = isEditingUsername
      ? newUsername
      : user.authenticatedUser!.username;
    const imageUrlToSend = newImageUrl
      ? newImageUrl
      : user.authenticatedUser!.imageUrl;
    if (
      (bioToSend && bioToSend.length > 100) ||
      usernameToSend.length < 3 ||
      usernameToSend.length > 30
    )
      return;
    updateUserAccountDetails(bioToSend, usernameToSend, imageUrlToSend);
    resetForms();
  };

  const resetForms = () => {
    setIsEditingBio(false);
    setIsEditingUsername(false);
    setNewBio("");
    setNewUsername("");
    setNewImageUrl("");
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleImageUpload = async () => {
    try {
      setIsUploadingFile(true);
      if (!fileInputRef.current.files) return;
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await api.uploadFile(formData);
      if (!response.data.contentType.includes("image")) {
        fileInputRef.current.files = null;
        return;
      }
      setNewImageUrl(response.data.fileUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const confirmed = confirm(
        "Are you sure you want to delete your account? This process is irreversible."
      );
      if (confirmed) {
        await api.deleteUserAccount();
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      ref={innerRef}
      className={`settings-container user-settings-container dropdown is-right ${
        isOpen && "is-active"
      }`}
    >
      <div className="dropdown-trigger">
        <button
          onClick={toggleOpen}
          className="button is-rounded settings-button dropdown-trigger-button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>
            <i className="fas fa-user"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {isUploadingFile ? (
            <CircularProgress color="inherit" />
          ) : (
            <img
              src={
                newImageUrl
                  ? newImageUrl
                  : user.authenticatedUser?.imageUrl
                  ? user.authenticatedUser?.imageUrl
                  : "https://socialape-98946.firebaseapp.com/static/media/no-image.5a021ab9.png"
              }
              alt="user"
              className="dropdown-item user-settings-user-image"
              onClick={triggerFileInput}
            />
          )}
          <input
            onChange={handleImageUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
          />
          {isEditingUsername ? (
            <input
              className="input user-settings-username-input"
              placeholder="Username"
              value={newUsername}
              maxLength={30}
              onChange={(e) => handleChange(e, setNewUsername)}
            />
          ) : (
            <div
              onClick={editUsername}
              className="dropdown-item user-settings-username ignore-outer-click"
              title="Edit username"
            >
              {user.authenticatedUser?.username}
            </div>
          )}
          {isEditingBio ? (
            <div className="textarea-container">
              <textarea
                className="textarea has-fixed-size user-settings-bio-textarea"
                placeholder="Bio"
                value={newBio}
                maxLength={100}
                rows={3}
                onChange={(e) => handleChange(e, setNewBio)}
              />
            </div>
          ) : (
            <div
              onClick={editBio}
              className="dropdown-item user-settings-bio ignore-outer-click"
              title="Edit bio"
            >
              {user.authenticatedUser?.bio
                ? user.authenticatedUser.bio
                : "Your bio"}
            </div>
          )}
          {hasMadeChange() && (
            <button
              onClick={handleUpdate}
              className="user-settings-button button is-success ignore-outer-click"
            >
              Update account
            </button>
          )}
          <button
            onClick={handleDeleteAccount}
            className="user-settings-button button is-danger"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}

export default connector(UserSettings);
