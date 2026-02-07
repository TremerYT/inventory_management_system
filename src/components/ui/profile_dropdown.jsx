import {Avatar, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useProfileDropdown} from "../../utils/menu_items.jsx";
import {useAuth} from "../../context/auth/auth_provider.jsx";

const {Text} = Typography;

const ProfileDropDown = () => {
  const profileDropdown = useProfileDropdown();
  const {user} = useAuth();
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg min-w-[200px]">
      <div className="flex items-center gap-4 pb-2 border-b border-gray-200">
        <Avatar icon={<UserOutlined/>} size={48}/>
        <div className="flex flex-col items-start">
          <Text className="font-semibold text-gray-800">
            {user?.sub}
          </Text>
          <Text type="secondary" className="text-sm">
            Admin
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        {profileDropdown.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={item.onClick}
          >
            <div className="text-gray-600">{item.icon}</div>
            <Text className="text-gray-800">{item.label}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDropDown;
