import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  MutableRefObject,
  MouseEvent,
  useEffect,
} from "react";
import "./ChatForm.scss";
import ChatInput from "../../common/ChatInput/ChatInput";
import { CircularProgress } from "@material-ui/core";
import File from "../../common/File/File";
import api from "../../api/api";
import { isMobile } from "react-device-detect";
// redux
import { connect, ConnectedProps } from "react-redux";
import { setReplyData } from "../../redux/actions/dataActions";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ data: state.data });
const mapActionsToProps = { setReplyData };
const connector = connect(mapStateToProps, mapActionsToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { socket: SocketIOClient.Socket | null };

function ChatForm({ data, socket, setReplyData }: Props) {
  const [messageBody, setMessageBody] = useState("");
  const [messageType, setMessageType] = useState("text");
  const [fileName, setFileName] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isFileError, setIsFileError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (messageBody.length > 0) setIsTyping(true);
    else setIsTyping(false);
  }, [messageBody]);

  useEffect(() => {
    const userIdToReemit = data.selectedConversation?.userId;
    socket?.emit("isTyping", { isTyping, userIdToReemit });
  }, [isTyping]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setMessageBody(event.target.value);

  const submitChatMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!data.selectedConversation) return;
    const message = {
      body: messageBody,
      type: messageType,
      file: { name: fileName, url: fileUrl },
      conversation: data.selectedConversation,
      replyData: data.replyData,
    };
    socket?.emit("sendMessage", message);
    setMessageBody("");
    resetFileData();
    setReplyData(null);
  };

  const handleFileAdd = async () => {
    setIsFileError(false);
    if (!fileInputRef.current.files) return;
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      setIsUploadingFile(true);
      const response = await api.uploadFile(formData);
      setFileUrl(response.data.fileUrl);
      setFileName(file.name);
      setFileKey(response.data.key);
      setMessageType(
        response.data.contentType.includes("image")
          ? "image"
          : response.data.contentType.includes("video")
          ? "video"
          : "other"
      );
    } catch (error) {
      fileInputRef.current.value = "";
      setIsFileError(true);
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleFileRemove = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await api.deleteFile(fileKey);
    resetFileData();
  };

  const resetFileData = () => {
    setMessageType("text");
    setFileName("");
    setFileKey("");
    setFileUrl("");
    fileInputRef.current.value = "";
  };

  const resetReplyData = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setReplyData(null);
  };

  return (
    <form className="chat-form-container" onSubmit={submitChatMessage}>
      <div className="file-container">
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          id="file-input"
          onChange={handleFileAdd}
        />
        {fileName ? (
          <button
            onClick={(e) => handleFileRemove(e)}
            className="button is-rounded remove-button"
            title="Remove file"
          >
            <i className="fas fa-times"></i>
          </button>
        ) : (
          <label htmlFor="file-input" title="Add a file">
            <i className="fas fa-paperclip"></i>
          </label>
        )}
        {fileName && <File name={fileName} url={fileUrl} />}
        {isFileError && (
          <p style={{ color: "hsl(348, 100%, 61%)" }}>Cannot upload file</p>
        )}
        {isUploadingFile && (
          <div className="circular-progress-container">
            <CircularProgress color="inherit" />
          </div>
        )}
        {data.replyData && (
          <>
            <button
              onClick={(e) => resetReplyData(e)}
              className="button is-rounded remove-button"
              title="Cancel reply"
            >
              <i className="fas fa-times"></i>
            </button>
            <span
              title={`Replying to ${data.replyData.to}`}
              className="form-reply-data"
              style={{ marginLeft: isMobile ? -5 : 0 }}
            >
              <i className="fas fa-reply"></i>
              {data.replyData.to}: {data.replyData.body}
            </span>
          </>
        )}
      </div>
      <ChatInput handleChange={handleChange} type="chat" value={messageBody} />
      <button
        className="button is-rounded submit-button"
        type="submit"
        disabled={
          (messageBody.length === 0 && fileUrl.length === 0) ||
          isUploadingFile ||
          !data.selectedConversation
        }
      >
        Send
      </button>
    </form>
  );
}

export default connector(ChatForm);
