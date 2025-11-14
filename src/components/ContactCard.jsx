export const ContactCard = ({ userName = 'Unknown', onClick, isActive }) => {
  const createIco = () => {
    const parts = userName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (userName.length >= 2) {
      return userName.slice(0, 2).toUpperCase();
    } else {
      return userName.toUpperCase();
    }
  };

  return (
    <div
      className={`contact_card_container ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}>
      <div className='contact_card_container_ico'>{createIco()}</div>
      <div className='contact_card_container_name'>{userName}</div>
    </div>
  );
};
