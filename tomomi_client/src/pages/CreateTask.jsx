import Header from '../components/App/Header';
import CreateTask from '../components/Task/CreateTask';

export default function CreateTaskPage() {
  return (
    <>
      <Header
        heading='So now...! =-)'
        paragraph=''
        linkName='Already created a Task? '
        linkUrl='/tasks/update'
      />
      <CreateTask />
    </>
  );
}
