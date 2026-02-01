import {Button} from "antd";
import {FileExcelFilled, FilePdfFilled, PlusOutlined, ReloadOutlined} from "@ant-design/icons";

const CustomHeader = ({title, subTitle, buttonPath, buttonText, handleOnClick}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex flex-col items-start">
        <h2 className="text-2xl">{title}</h2>
        <p>{subTitle}</p>
      </div>
      <div className="flex gap-3">
        <Button
          type="text"
          icon={<FilePdfFilled style={{ fontSize: 20, color: "red" }} />}
          onClick={() => {}}
        />
        <Button
          type="text"
          icon={<FileExcelFilled style={{ fontSize: 20, color: "green" }} />}
          onClick={() => {}}
        />
        <Button
          type="text"
          icon={<ReloadOutlined style={{ fontSize: 20 }} />}
          onClick={() => {}}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOnClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default CustomHeader;