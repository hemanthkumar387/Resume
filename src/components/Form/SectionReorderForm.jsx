import { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* Single draggable row */
const SortableItem = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="section-drag-item"
    >
      ☰ {id.toUpperCase()}
    </div>
  );
};

const SectionReorderForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = resumeData.sectionOrder.indexOf(active.id);
    const newIndex = resumeData.sectionOrder.indexOf(over.id);

    const updated = [...resumeData.sectionOrder];
    updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, active.id);

    setResumeData({
      ...resumeData,
      sectionOrder: updated,
    });
  };

  return (
    <div className="form-section">
      <h3>Reorder Resume Sections</h3>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={resumeData.sectionOrder}
          strategy={verticalListSortingStrategy}
        >
          {resumeData.sectionOrder.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SectionReorderForm;
