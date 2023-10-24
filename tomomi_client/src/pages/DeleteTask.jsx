import Header from '../components/App/Header';
import DeleteTask from '../components/Task/DeleteTask';

export default function DeleteTaskPage() {
  return (
    <>
      <Header
        heading='Ummm... =-('
        paragraph=''
        linkName='Changed your mind? '
        linkUrl='/home'
      />
      <DeleteTask />
    </>
  );
}
