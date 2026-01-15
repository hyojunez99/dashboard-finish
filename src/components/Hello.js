const Hello = ({ user, onLogout }) => {
  return (
    <div id="hello-page">
      <div className="logout-box">
      <h2>{user}님 안녕하세요</h2>
      <button onClick={onLogout}><p>로그<br/>아웃</p></button>
      </div>
    </div>
  );
};

export default Hello;
