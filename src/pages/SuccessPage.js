import { Button } from "@mui/material";

import { Link } from "react-router-dom";

const SuccessPage = () => {
    return (
        <div>
            Thanh toán thành công!
            <Link  to="/thongtinphong">
                <Button variant="contained" color="primary">
                    Trở về
                </Button>
            </Link>
        </div>
    );
}

export default SuccessPage;