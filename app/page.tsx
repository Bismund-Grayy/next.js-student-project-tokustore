import Image from "next/image";
import Link from "next/link";




export default function Home() {
  // This is the landing page of the application.
  // It displays the welcome message, the main Display component,
  // and navigation links to the user authentication pages.
  return (
    <main>
      { /* Home/Front page*/ }
      <h1>Welcome to MatchAI!</h1>
        {/*<Display />*/}
        <footer>
          <p>Contact us: support@matchai.com</p>
          <a href="https://youtube.com">YouTube</a>
          <a href="https://facebook.com">Facebook</a>
        </footer>
        <nav>
          {/* Link to the Login/Registration page */}
          <Link href="/users"><b style={{color: 'red'}}>Login/Register</b></Link>
        </nav>
    </main>
  );
}
