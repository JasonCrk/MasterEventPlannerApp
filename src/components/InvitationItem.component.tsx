import { FC } from 'react';
import Avatar from './Avatar.component';
import Button from './Button.component';

interface Props {
  userId: string;
  avatar: string;
  username: string;
  notifiedAt: string;
}

const InvitationItem: FC<Props> = ({
  userId,
  avatar,
  username,
  notifiedAt,
}) => {
  const handleAccept = () => {
    console.log(`Invitación aceptada para el usuario con ID: ${userId}`);
  };

  const handleReject = () => {
    console.log(`Invitación rechazada para el usuario con ID: ${userId}`);
  };

  const redirectToProfile = () => {
    window.location.href = `/${userId}/profile`;
  };

  return (
    <div className="mx-auto d-flex align-items-center border rounded p-3 bg-white text-dark">
      <div onClick={redirectToProfile}>
        <Avatar size="50px" src={avatar} alt={`${username}'s Avatar`} />
      </div>
      <div className="ms-3 flex-grow-1">
        <div className="fw-bold">{username} quiere conectarse con usted</div>
        <div>{notifiedAt}</div>
      </div>
      <div className="ms-3"> {/* Añadido espacio entre los botones */}
        <Button btnColor="success" onClick={handleAccept}>
          Aceptar
        </Button>
      </div>
      <div className="ms-2"> {/* Añadido espacio entre los botones */}
        <Button btnColor="danger" onClick={handleReject}>
          Rechazar
        </Button>
      </div>
    </div>
  );
};

export default InvitationItem;
