import { useState } from "react";

const Login = ({onLogin}) => {
  const [user, setUser] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); //이미 있는 기능 실행 방지
    onLogin(user);
  };
  
  return (
    <form id="login-page" onSubmit={handleSubmit}>
      <div className="login-box">
      <input
        type="text"
        value={user}
        placeholder="이름을 입력하세요"
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <button type="submit"><p>로그인</p></button>
      </div>
    </form>
  );
};

export default Login;
