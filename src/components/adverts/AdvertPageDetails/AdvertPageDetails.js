import { useParams } from "react-router-dom";
import Content from "../../../components/layout/Content"

function AdvertPageDetails() {
  const params = useParams();
  console.log({ params });
  return(
    <Content title="Adverts Details">
      <div>Adverts Details { params.advertId } aqui</div>
    </Content>
  );
}

export default AdvertPageDetails;