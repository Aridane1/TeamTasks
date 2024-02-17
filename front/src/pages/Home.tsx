import { FloatButton } from "antd";
import { Card } from "../components/Card";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center mt-10 flex-wrap gap-5 mb-20 w-[90%] mx-auto ">
        <Card
          title="The Coldest Sunset"
          description="  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil."
          image="image-1708094236351.png"
        />
        <Card
          title="The Coldest Sunset"
          description="  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil."
          image="image-1708094236351.png"
        />
        <Card
          title="The Coldest Sunset"
          description="  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil."
          image="image-1708094236351.png"
        />
        <Card
          title="The Coldest Sunset"
          description="  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil."
          image="image-1708094236351.png"
        />
        <Card
          title="The Coldest Sunset"
          description="  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil."
          image="image-1708094236351.png"
        />
        <FloatButton.BackTop />
      </div>
    </div>
  );
}
