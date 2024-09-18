import { Grid, Container, Box, Typography } from "@mui/material";
import Banner from "~/component/Layout/componet/Banner";
import Footer from "~/component/Layout/componet/Footer";
import Pagination from "~/component/Layout/componet/Pagination";
import { useSelector } from "react-redux";
import { inforproducts } from "~/reudx/selectors";
import { useState, useEffect } from "react";

function Home() {
  const products = useSelector(inforproducts);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the banner on screens below 800px (xs)
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Banner Section */}
        <Grid item xs={12}>
          <Box
            sx={{
              marginTop: 2,
              position: "relative",
              height: "370px", // Fixed height for the banner
              overflow: "hidden",
              opacity: isVisible ? 1 : 0, // Apply opacity based on visibility
              transition: "opacity 0.5s ease-in-out", // Smooth transition
              display: { xs: "none", md: "block" }, // Hide on xs screens and show on md and up
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", // Add shadow effect
            }}
          >
            <Banner />
          </Box>
        </Grid>
        {/* Main Content Section */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically if needed
              
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Danh sách sản phẩm
            </Typography>
          </Box>
        </Grid>

        {/* Main Content Section */}
        <Grid item xs={12}>
        <Box
        >
          {/* Example Pagination items */}
          <Pagination products={products} />
        </Box>
      </Grid>

        {/* Footer Section */}
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
