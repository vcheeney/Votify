import { Link } from "remix";

export default function Index() {
  return (
    <div>
      <h1>Welcome to Votify</h1>
      <h2>Landing Page</h2>
      <Link to="/vote">Vote now</Link>
    </div>
  );
}
