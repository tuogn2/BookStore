import { useState } from "react";
import Miniproduct from "../Miniproduct";
import { Box,  Pagination as MUIPagination } from "@mui/material";

function Pagination({ products }) {
  const totalProduct = products.length;
  const perPage = 12;
  const quantity = Math.ceil(totalProduct / perPage);
  const [currentPage, setCurrentPage] = useState(1);

  const start = (currentPage - 1) * perPage;
  const end = currentPage * perPage;

  const ProductPagination = () => {
    return products
      .slice(start, end)
      .map((product, index) => <Miniproduct key={index} product={product} />);
  };

  return (
    <>
      <div  style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', // Create 4 equal-width columns
            gap: 2, // Gap between grid items
            padding: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for a better look
            width: '100%',
            boxSizing: 'border-box',
          }}>
        <ProductPagination />
      </div>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <MUIPagination
            count={quantity}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            siblingCount={1}
            boundaryCount={1}
            color="primary"
          />
        </Box>
      </div>
    </>
  );
}

export default Pagination;
