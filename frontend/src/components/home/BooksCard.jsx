import { Link } from "react-router-dom";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default BooksCard;
