import Game from "@/components/Game";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <div className="my-4">
        <Header/>
        <Game />
      </div>
    </div>
  );
}
