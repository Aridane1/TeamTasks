import { AutoComplete } from "antd";
import UserService from "../services/UserService";
import { ReactElement, useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  email?: string;
  password?: string;
}

interface Option {
  label: ReactElement;
  value: string;
}
export default function Meeter() {
  const [users, setUsers] = useState<User[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    fillOptions();
  }, [users]);

  const getAllUser = async () => {
    try {
      const users = await UserService.getAllUsers();
      setUsers(users);
    } catch (err) {
      console.log(err);
    }
  };
  const prueba = () => {
    console.log("¿Funciona?");
  };

  const fillOptions = () => {
    const optionsUsers: Option[] = [];

    users.map((user) => {
      optionsUsers.push({
        label: (
          <div>
            {user.username}{" "}
            <button className="bg-red-300" onClick={prueba}>
              Seguir
            </button>
          </div>
        ),
        value: user.username,
      });

      setOptions(optionsUsers);
    });
  };
  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <img className="size-40" src="/images/TeamTaskRecortado.png" alt="" />

        <AutoComplete
          options={options}
          style={{ width: 300, height: "2.5rem" }}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    </>
  );
}
