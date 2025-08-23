import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, LayoutGrid } from "lucide-react";


export const ListDetailsToggle = ({ listView = true, setListView, cb }) => {

    return (
        <ToggleGroup
            type="single"
            value={listView ? 'list' : 'detail'}
            onValueChange={(newValue) => {

                if (newValue) {
                    setListView(prev => !prev);
                    cb && cb();
                }
            }}
            className="border border-border rounded-lg p-0 m-2 space-x-2 ml-auto"
        >
            <ToggleGroupItem
                value={"list"}
                aria-label="List view"
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground mx-2"
            >
                <List className="h-4 w-4" />
                <span className="ml-2">List</span>
            </ToggleGroupItem>
            <ToggleGroupItem
                value={"detail"}
                aria-label="Detail view"
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
                <LayoutGrid className="h-4 w-4" />
                <span className="ml-2">Detail</span>
            </ToggleGroupItem>
        </ToggleGroup>
    );
};