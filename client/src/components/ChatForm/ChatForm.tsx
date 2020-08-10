import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  MutableRefObject,
  MouseEvent,
} from "react";
import "./ChatForm.scss";
import ChatInput from "../../common/ChatInput/ChatInput";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import File from "../../common/File/File";
// redux
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../redux/store";

const mapStateToProps = (state: IState) => ({ data: state.data });
const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & { socket: SocketIOClient.Socket | null };

function ChatForm({ data, socket }: Props) {
  const [messageBody, setMessageBody] = useState("");
  const [messageType, setMessageType] = useState("text");
  const [fileName, setFileName] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isFileError, setIsFileError] = useState(false);
  const fileInputRef = useRef() as MutableRefObject<HTMLInputElement>;

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
    };
    socket?.emit("sendMessage", message);
    setMessageBody("");
    resetFileData();
  };

  const handleFileAdd = async () => {
    setIsFileError(false);
    if (!fileInputRef.current.files) return;
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      setIsUploadingFile(true);
      const response = await axios.post("/files", formData);
      setFileUrl(response.data.fileUrl);
      setFileName(file.name);
      setFileKey(response.data.key);
      setMessageType(
        response.data.contentType.includes("image") ? "image" : "other"
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
    await axios.delete("/files", { data: { key: fileKey } });
    resetFileData();
  };

  const resetFileData = () => {
    setMessageType("text");
    setFileName("");
    setFileKey("");
    setFileUrl("");
    fileInputRef.current.value = "";
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
            className="button is-rounded remove-file-button"
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
        {isUploadingFile && <CircularProgress color="inherit" />}
      </div>
      <ChatInput handleChange={handleChange} type="chat" value={messageBody} />
      <button
        className="button is-rounded submit-button"
        type="submit"
        disabled={
          (messageBody.length === 0 && fileUrl.length === 0) || isUploadingFile
        }
      >
        Send
      </button>
    </form>
  );
}

export default connector(ChatForm);
