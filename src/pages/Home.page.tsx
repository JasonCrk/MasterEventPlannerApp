import ConnectionInvitation from '../components/ConnectionInvitation.component';

function Home() {

  return (
    <div>
      
      <ConnectionInvitation
              userId="1"
              avatar="url_del_avatar"
              username="Usuario1"
              notifiedAt="2023-11-08"
      />
    </div>
  );
}

export default Home
