"use client"

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useState , useEffect, useMemo} from "react";
import axios from 'axios';
import { toast } from 'sonner';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}


export default function Home() {
  const [loading,setLoading] = useState(true);
  const [trades,setTrades] = useState([]);
  const [TargetUrl,setTargetUrl] = useState(targeturl);
  const [pageNo,setPageNo]=  useState(1);
  const [trades2, setTrades2] = useState([]);

  const apiUrl = 'http://127.0.0.1:5000/trades';
  var targeturl = 'https://www.capitoltrades.com/trades';

  useEffect(() =>{
    const fetchData = async () => {
      setLoading(true);
      const cachedData = sessionStorage.getItem(TargetUrl);
      if (cachedData) {
        setTrades2(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
      try{
        const response = await axios.get(apiUrl,{
          params: {
            url : TargetUrl
          }
        });

        const capitalizedTrades = response.data.Type.map(type => {
          return type === 'BUY' ? 'Buy' : 'Sell';
        });
        const updatedTrades = { ...response.data, Type: capitalizedTrades };
        sessionStorage.setItem(TargetUrl, JSON.stringify(updatedTrades));
        setTrades2(updatedTrades);
        // console.log(updatedTrades);
      }
      catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  },[TargetUrl]);

  const [sortBy, setSortBy] = useState("tradeDate")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterBy, setFilterBy] = useState("")
  const sortedTrades = useMemo(() => {
    return trades
      .sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1
        return 0
      })
      .filter((trades2) => {
        return filterBy ? trades2.Politians.toLowerCase().includes(filterBy.toLowerCase()) : true
      })
  }, [trades, sortBy, sortOrder, filterBy])

  const handleClick = () => {
    toast('This is yet to be implemented!!',{duration: 2000,style: { backgroundColor: '#3d9bd1', color: '#fff' }});
  };

  useEffect(() => {
    const newTargetUrl = `https://www.capitoltrades.com/trades?page=${pageNo}`;
    setTargetUrl(newTargetUrl);
  }, [pageNo]);

  const incPageClick = () => {
    setPageNo(prevPageNo => {
      const newPageNo = prevPageNo + 1;
      return newPageNo;
    });
  }

  const decPageClick = () => {
    setPageNo(prevPageNo => {
      const newPageNo = prevPageNo - 1;
      return Math.max(newPageNo, 1)
    });
  }

  return (
    <>
    <div>
      <NavigationMenu className="bg-[#205fe6] h-[4rem] flex items-center ">
      <NavigationMenuList className="w-screen flex items-center px-4 ">
        <NavigationMenuItem >
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="Picture of the Logo"
        />
        </NavigationMenuItem>
        <NavigationMenuItem className="px-4">
        <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
        <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-screen px-4">
        <Link href="https://www.linkedin.com/in/siddharth-mishra03/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              LinkedIn
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
    <main className="flex-1">
        <section className="bg-muted py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Transparency in Congress</h1>
                <p className="text-muted-foreground md:text-xl">
                  Track the stock trades made by US Congress Members to promote accountability and transparency in
                  government.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md bg-[#205fe6] px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-[#205fe6]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  prefetch={false}
                >
                  Learn More
                </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Recent Congress Trades</h2>
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Search by member name"
                  // value={filterBy}
                  onChange={handleClick}
                  className="max-w-md flex-1"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="shrink-0" onClick={handleClick}>
                      {/* <ArrowUpDownIcon className="w-4 h-4 mr-2" /> */}
                      Sort by {sortBy}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]" align="end">
                    <DropdownMenuRadioGroup value={sortBy} onValueChange={handleClick}>
                      <DropdownMenuRadioItem value="member">Member</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="party">Party</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="house">House</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="ticker">Stock</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="tradeDate">Trade Date</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="tradeAmount">Trade Amount</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortOrder} onValueChange={handleClick}>
                      <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spinner /> 
            </div>  ):
            ( 
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Party</TableHead>
                    <TableHead>House</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-center">Traded</TableHead>
                    <TableHead>Filed After</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-center">Trade Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades2.Politians && trades2.Politians.map((politician,index) => (
                    <TableRow key={index}>
                      <TableCell>{politician}</TableCell>
                      <TableCell>{trades2.Politians_info[index][0]}</TableCell>
                      <TableCell>{trades2.Politians_info[index][1]}</TableCell>
                      <TableCell className="text-center">
                      <Link legacyBehavior href={`/stock_page?ticker=${trades2.Issuers_token[index]}`} passHref>
                        <a className="text-blue-500 hover:underline">
                          {trades2.Issuers[index]}
                        </a>
                      </Link>
                      </TableCell>
                      <TableCell className="text-center">{trades2.Traded[index]}</TableCell>
                      <TableCell>{trades2.Filed[index]} day{(trades2.Filed[index]>1 ? "s" : "")}</TableCell>
                      <TableCell>{trades2.Prices[index]}</TableCell>
                      <TableCell className={`text-center ${trades2.Type[index] === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>{trades2.Type[index]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
                  )}
          </div>
        </section>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={decPageClick} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{pageNo}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{pageNo + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{pageNo + 2}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={incPageClick} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <section className="bg-muted py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Why Track Congress Trades?</h2>
              <p className="text-muted-foreground md:text-xl">
                Tracking the stock trades made by US Congress members is important for promoting transparency and
                accountability in government. By monitoring these trades, we can identify potential conflicts of
                interest and ensure that our elected officials are acting in the best interests of the public, rather
                than their own financial gain.
              </p>
              <p className="text-muted-foreground md:text-xl">
                This information can also help citizens make more informed decisions about the politicians they choose
                to support, and hold them accountable for their actions. Transparency in government is essential for a
                healthy democracy, and this website aims to provide a valuable resource for tracking and understanding
                the financial activities of our elected representatives.
              </p>
            </div>
          </div>
        </section>
        <footer className="bg-muted text-muted-foreground py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">&copy; 2024 Congress Trades</p>
          <nav className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms
            </Link>
            <Link href="https://www.linkedin.com/in/siddharth-mishra03/" className="hover:underground" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
