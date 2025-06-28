import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";

const MultiSelect = ({ values = [], selectedItems, setSelectedItems, actionTitle, dropdownLabel }) => {
    // const [selectedItems, setSelectedItems] = useState([]);
    const handleSelectChange = (value) => {
        if (!selectedItems.includes(value)) {
            setSelectedItems((prev) => [...prev, value]);
        } else {
            const referencedArray = [...selectedItems];
            const indexOfItemToBeRemoved = referencedArray.indexOf(value);
            referencedArray.splice(indexOfItemToBeRemoved, 1);
            setSelectedItems(referencedArray);
        }
    };

    const isOptionSelected = (value) => {
        return selectedItems.includes(value) ? true : false;
    };
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex gap-2 font-bold">
                        <span>{actionTitle}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
                    <DropdownMenuLabel>{dropdownLabel}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {values?.map((value, index) => {
                        return (
                            <DropdownMenuCheckboxItem
                                onSelect={(e) => e.preventDefault()}
                                key={index}
                                checked={isOptionSelected(value.key)}
                                onCheckedChange={() => handleSelectChange(value.key)}
                            >
                                {value.value}
                            </DropdownMenuCheckboxItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default MultiSelect