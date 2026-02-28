import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col p-4 md:p-6">
      <div className="flex flex-1 flex-col gap-6 min-w-0">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-72" />
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-56" />
            </div>
            <Skeleton className="h-9 w-28" />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[600px] text-left text-sm table-fixed">
                <colgroup>
                  <col className="w-[25%]" />
                  <col className="w-[25%]" />
                  <col className="w-[15%]" />
                  <col className="w-[10%]" />
                  <col className="w-[25%]" />
                </colgroup>
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="p-3 font-medium">Name</th>
                    <th className="p-3 font-medium">Slug</th>
                    <th className="p-3 font-medium">Price</th>
                    <th className="p-3 font-medium">Featured</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0"
                    >
                      <td className="p-3">
                        <Skeleton className="h-4 w-full max-w-[12rem]" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-full max-w-[10rem]" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-full max-w-[7rem]" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-8" />
                      </td>
                      <td className="p-3 flex items-center gap-3">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-4 shrink-0" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
