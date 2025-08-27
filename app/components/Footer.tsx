import Image from "next/image";

export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="attribution">
        <p>This website uses the TMDb API</p>
        <Image 
          src="/tmdb-logo.svg" 
          alt="The Movie Database" 
          width={150}
          height={64}
          className="tmdb-logo"
        />
      </div>
    </footer>
  );
}
