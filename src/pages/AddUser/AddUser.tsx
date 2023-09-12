import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./addUser.module.css";
import { User } from "../../types/types";
import { LABELS } from "../../utils/constants";

type Props = {
  users: User[];
  setUsers: (users: User[]) => void;
};

const AddUser = ({ users, setUsers }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    city: "",
    company: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = { ...user, id: (users.length + 1).toString() };
    setUsers([...users, newUser]);
    setUser({
      id: "",
      name: "",
      email: "",
      city: "",
      company: "",
    });
    navigate("/users");
  };

  return (
    <div className={styles.container}>
      <h2>{LABELS.ADD_NEW_USER}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="name">{LABELS.NAME}:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="email">{LABELS.EMAIL}:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="city">{LABELS.CITY}:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={user.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="company">{LABELS.COMPANY}:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={user.company}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{LABELS.ADD}</button>
      </form>
      <Link to={"/users"}>{LABELS.VIEW_ALL_USERS}</Link>
    </div>
  );
};

export default AddUser;
