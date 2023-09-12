import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSortAZ, BiSortZA, BiSortAlt2 } from "react-icons/bi";

import { User } from "../../types/types";
import { LABELS } from "../../utils/constants";
import styles from "./users.module.css";

type Props = {
  users: User[];
};

type UserTable = {
  sortedUsers: User[];
  sortedBy?: keyof User;
  ascending?: boolean;
};

const Users = ({ users }: Props) => {
  const [tabledata, setTabledata] = useState<UserTable>({ sortedUsers: [] });

  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setTabledata({
      sortedUsers,
      sortedBy: "name",
      ascending: true,
    });
  }, [users]);

  const handlesort = (sortBy: keyof User) => {
    const sortedUsers = [...users].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );

    let ascending: boolean = true;
    if (sortBy === tabledata.sortedBy && tabledata.ascending) {
      ascending = false;
      sortedUsers.reverse();
    }

    setTabledata({
      sortedUsers,
      sortedBy: sortBy,
      ascending,
    });
  };

  const SortIcon = (column: keyof User) =>
    column !== tabledata.sortedBy ? (
      <BiSortAlt2 />
    ) : tabledata.ascending ? (
      <BiSortAZ />
    ) : (
      <BiSortZA />
    );

  return (
    <div className={styles.container}>
      <h2>{LABELS.ALL_USERS}</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handlesort("name")}>
              <span>
                {LABELS.NAME} {SortIcon("name")}
              </span>
            </th>
            <th onClick={() => handlesort("email")}>
              <span>
                {LABELS.EMAIL} {SortIcon("email")}{" "}
              </span>
            </th>
            <th onClick={() => handlesort("city")}>
              <span>
                {LABELS.CITY} {SortIcon("city")}
              </span>
            </th>
            <th onClick={() => handlesort("company")}>
              <span>
                {LABELS.COMPANY} {SortIcon("company")}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tabledata.sortedUsers.length
            ? tabledata.sortedUsers.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.city}</td>
                  <td>{row.company}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <Link to={"/add-user"}>{LABELS.ADD_NEW_USER}</Link>
    </div>
  );
};

export default Users;
