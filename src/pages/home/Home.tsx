import { Button } from "../../components/ui/button";
import {Card} from "../../components/ui/card.tsx";
import {Checkbox} from "../../components/ui/checkbox.tsx";

export default function Home() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <Button>Click Me</Button>
        <Card title="Card Title">dddd</Card>
        <Checkbox title={"Checkbox"} />
    </div>
  );
}