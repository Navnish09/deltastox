import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThumbHeading } from "../_components/ThumbHeading";
import { cn } from "@/lib/utils";
import { TrendDown, TrendUp } from "../_icons";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

const stockData = [
  {
    name: "TCS",
    price: 3378.95,
    change: 28.4,
  },
  {
    name: "HDFC",
    price: 1484.9,
    change: 28.4,
  },
  {
    name: "ICIC BANK",
    price: 924.5,
    change: 28.4,
  },
  {
    name: "INFOSYS",
    price: 3378.95,
    change: 28.4,
  },
  {
    name: "MAHINDRA",
    price: 2378.95,
    change: 28.4,
  },
  {
    name: "SBI",
    price: 1378.95,
    change: 28.4,
  },
];

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-10">
          <ThumbHeading heading="Market Info" />
          <div className="flex flex-col gap-10">
            <Card>
                <ul className="flex overflow-x-auto no-scrollbar p-3">
                  {stockData.map((stock) => (
                    <li className="flex gap-3 border-r-4 px-2 border-secondary last:border-none text-sm">
                      <span className="whitespace-nowrap">{stock.name}</span>
                      <span className="whitespace-nowrap">{stock.price}</span>
                      <span
                        className={cn(
                          {
                            ["text-success"]: stock.change > 0,
                            ["text-destructive"]: stock.change < 0,
                          },
                          "whitespace-nowrap"
                        )}
                      >
                        {stock.change > 0 ? "+" : "-"}
                        {stock.change}( +0.85% )
                      </span>
                    </li>
                  ))}
                </ul>
            </Card>
            <div className="flex justify-center gap-10">
              <Card
                style={{
                  background:
                    "linear-gradient(-20deg, #151515 -8.88%, #09090A 48.04%, #151515 101.51%)",
                }}
              >
                <CardHeader>
                  <div className="flex flex-col gap-3 items-center py-2 px-12">
                    <h5>NIFTY</h5>
                    <h2 className="text-destructive">-19322.55</h2>
                    <Card className="w-fit rounded-md">
                      <span className="text-destructive flex p-1 gap-1 items-center text-xs font-semibold">
                        <ArrowDownIcon height={18} width={18} /> 7.82%
                      </span>
                    </Card>
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-3 items-center py-2 px-12">
                    <h5>BANKNIFTY</h5>
                    <h2 className="text-success">44,888.24</h2>
                    <Card className="w-fit rounded-md">
                      <span className="text-success flex p-1 gap-1 items-center text-xs font-semibold">
                        <ArrowUpIcon height={18} width={18} /> 3.32%
                      </span>
                    </Card>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
