import { List, ListItemButton } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import images from "../utils/images+icons";

/**
 *
 * @param {childComponent} children
 * @returns Sidebar Rendered content
 */
export default function Sidebar({children, Menus})
{
  /**
   * open state variables
   */
  const [open, setOpen] = useState(true);
  /**
   * use localStorage to keep 'selected Item' boolean variable
   * to highlight selected element on the Sidebar elements.
   */
  const [selectedItem, setSelect] = useState(parseInt(localStorage.getItem("selectedItem")));
  localStorage.setItem("selectedItem", selectedItem);
  /**
   * Sidebar menu elements.
   */
  /**
   * page content
   * note:
   * images.{content} is used to import an image or icon to the page.
   */
  return (
    <section className="flex h-screen">
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
            className={`text-white origin-left font-semibold text-sm md:text-xl lg:text-2xl duration-200 ${
              !open && "scale-0"
            }`}>
            {localStorage.getItem("name")}
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
      <div className="w-screen p-7 bg-slate-100">
        {children}
      </div>
    </section>
  )
}