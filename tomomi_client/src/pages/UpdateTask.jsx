import Header from '../components/App/Header';
import UpdateTask from '../components/Task/UpdateTask';

export default function UpdateTaskPage() {
  return (
    <>
      <Header
        heading='Let&apos;s see'
        paragraph=''
        linkName='Miss click? '
        linkUrl='home'
      />
      <UpdateTask />
    </>
  );
}
