import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../../services/appApi";
import "./DashboardProducts.css";
import Pagination from "../Pagination/Pagination";
import Grid3x3TwoToneIcon from '@mui/icons-material/Grid3x3TwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TextFieldsIcon from '@mui/icons-material/TextFields';

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  // removing the product
  const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  function handleDeleteProduct(id) {
    // logic here
    if (window.confirm("Are you sure?"))
      deletProduct({ product_id: id, user_id: user._id });
  }

  const TableRow = ({ pictures, _id, name, price }) => {
    return (
      <tr>
        <td>
          <img
            src={pictures[0].url}
            className="dashboard-product-preview"
            alt="img_dashboard"
          />
        </td>
        <td><span className="backdrop-opacity-10 backdrop-invert bg-white/30 p-2 rounded-xl flex items-center w-fit text-[#fff] dark:text-[#404040]"><Grid3x3TwoToneIcon className="mr-1 text-[#71BC78]"/>{_id}</span></td>
        <td><span className="dashboard_product--name backdrop-opacity-10 backdrop-invert bg-white/30 p-2 rounded-xl flex items-center w-fit text-[#fff] dark:text-[#404040]"><TextFieldsIcon className="mr-1 text-[#f9b42d]"/>{name}</span></td>
        <td><span className="backdrop-opacity-10 backdrop-invert bg-white/30 p-2 rounded-xl flex items-center w-fit text-[#fff] dark:text-[#404040]"><FiberManualRecordIcon className="mr-1 text-[#00FF40]"/>{price}</span></td>
        <td className="dashboard_product--btn">
          <Button
            onClick={() => handleDeleteProduct(_id, user._id)}
            disabled={isLoading}
            className="dashboard_product--btn_delete"
          >
            <i class="fa-solid fa-trash"></i>
          </Button>
          <Link
            to={`/product/${_id}/edit`}
            className="btn dashboard_product--btn_edit"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </Link>
        </td>
      </tr>
    );
  }

  return (
    <div className="h-[150vh]">
    <Table responsive className="text-center">
      <thead className="text-white border-solid border-y-[1px] border-[#A0A0A0]">
        <tr>
          <th></th>
          <th className="text-[#fff] dark:text-[#404040]">Product ID</th>
          <th className="dashboard_product--name text-[#fff] dark:text-[#404040]">Product Name</th>
          <th className="text-[#fff] dark:text-[#404040]">Number of books available</th>
        </tr>
      </thead>
      <tbody className="bg-[#242529] dark:bg-[#F0F0F0] text-[#e8e8e8] ">
        <Pagination
          data={products}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={5}
          tablePagination={true}
        />
      </tbody>
    </Table>
    </div>
  );
}

export default DashboardProducts;
