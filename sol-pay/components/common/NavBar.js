import Link from "next/link";
import React from "react";
import { MdArrowBackIos } from "react-icons/md";

export default function NavBar(props) {
  return (
    <nav className="nav">
      <Link href={props.firstLink}>
        <div className="back">
          <MdArrowBackIos className="icon" /> Back
        </div>
      </Link>

      <h4>{props.title}</h4>

      <Link href={props.secondLink}>
        <div className="network">{props.secondIcon}</div>
      </Link>
    </nav>
  );
}
