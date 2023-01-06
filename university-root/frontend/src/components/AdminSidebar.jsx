import { List, ListItemButton } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import images from "../utils/images+icons";

/**
 * 
 * @param {childComponent} children
 * @returns Sidebar Rendered content
 */
export default function AdminSidebar({children}) 
{
  /**
   * open state variables
   */
  const [open, setOpen] = useState(true);
  /**
   * use localStorage to keep 'seclcted Item' boolean variable
   * to highlight selected elemnt on the Sidebar elements.
   */
  const [selectedItem, setSelect] = useState(parseInt(localStorage.getItem("selectedItem")));
  localStorage.setItem("selectedItem", selectedItem);
  /**
   * Sidebar menu elements.
   */
  const Menus = [
    { title: "Home", Src: images.Home, path: './home' },
    { title: "Account", Src: images.AccountCircle, path: './account'},
    { title: "Users", Src: images.Users, gap: true , path: './users' },
    { title: "Statistics", Src: images.AccountCircle , path: './account' },
    { title: "Search", Src: images.AccountCircle , path: './account' },
    { title: "Analytics", Src: images.AccountCircle , path: './account' },
    { title: "Files ", Src: images.AccountCircle, gap: true , path: './account' },
    { title: "Setting", Src: images.AccountCircle , path: './account' },
  ];

  /**
   * page content
   * note:
   * images.{content} is used to import an image or icon to the page.
   */
  return (
    <section className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-sky-700 h-screen p-5  pt-8 relative duration-300`}>
        <images.NavigateBeforeOutlined
          className={`absolute cursor-pointer -right-3 top-9 w-7 bg-white border-sky-700
          border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          color="primary"/>
        <div className="flex gap-x-4 items-center p-2">
          <img
            src={images.mainLogo}
            className={`cursor-pointer duration-500 h-7 ${
              open && "rotate-[360deg] h-7"
            }`}
            onClick={() => setOpen(!open)}
            alt='not found'/>
          <h1
            className={`text-white origin-left font-semibold text-xl duration-200 ${
              !open && "scale-0"
            }`}>
            Admin
          </h1>
        </div>
        <List className="pt-4">
        {/* map and renders Menu elements */}
          {Menus.map((Menu, index) => (
            <NavLink to={Menu.path}
            key={index}>
            <ListItemButton
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-sky-600 text-gray-100 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === selectedItem && "bg-sky-800"
              } `}
              onClick={()=>setSelect(index)}>
              <Menu.Src/>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </ListItemButton>
            </NavLink>
          ))}
        </List>
      </div>
      <div className="h-screen flex-1 p-7">
        {children}
      </div>
    </section>
  )
}