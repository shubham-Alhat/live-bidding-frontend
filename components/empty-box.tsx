import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PackagePlus } from "lucide-react";
export function EmptyOutline() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackagePlus />
        </EmptyMedia>
        <EmptyTitle>Empty products</EmptyTitle>
        <EmptyDescription>Create new products from above form</EmptyDescription>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}
