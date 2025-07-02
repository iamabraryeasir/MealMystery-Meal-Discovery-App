export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white py-6 mt-10 text-center">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/iamabraryeasir"
          target="_blank"
          className="text-white hover:underline"
        >
          Abrar Yeasir
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
}
