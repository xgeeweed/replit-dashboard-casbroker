import React, { useEffect, useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, GripVertical, PenLine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DraggableListProps {
  items: { [key: string]: any }[];
  field: any;
  pathname: string;
}

interface SortableItemProps {
  item: { [key: string]: any };
  pathname: string;
}

function SortableItem({ item, pathname }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px 16px",
    margin: "0 0 8px 0",
    // backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    cursor: "pointer",
    border: "1px solid #e5e7eb",
  };

  return (
    <Link href={pathname + item.id}>
      <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center justify-between">
        <span className="flex items-center space-x-2">
          <GripVertical className="text-gray-500 cursor-grab" width={16} />
          <p>{item.title}</p>
        </span>
        <span>
          <Edit className="text-gray-500" width={16} />
        </span>
      </li>
    </Link>
  );
}

function DraggableList({ items, field, pathname }: DraggableListProps) {
  const [list, setList] = useState(items);

  useEffect(() => {
    // field.onChange(list);
  }, [list]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setList((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={list} strategy={verticalListSortingStrategy}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {list.map((item) => (
            <SortableItem key={item.id} item={item} pathname={pathname} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default DraggableList;
