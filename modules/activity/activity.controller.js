const updateById = async (id, payload) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    // Fetch the activity and its subactivities
    const activity = await Model.findById(id).populate("subactivities");

    if (!activity) {
      throw new Error("Activity not found");
    }

    // If marking activity as completed, mark all subactivities as completed
    if (payload.isCompleted) {
      await SubActivityModel.updateMany(
        { activity: id },
        { isCompleted: true }
      );
    } else {
      // Ensure the activity is not marked as completed if any subactivity is incomplete
      if (activity.subactivities && activity.subactivities.length > 0) {
        const incompleteSubactivities = activity.subactivities.filter(
          (sub) => !sub.isCompleted
        );
        if (incompleteSubactivities.length > 0) {
          throw new Error(
            "Cannot mark activity as completed. Some subactivities are not completed."
          );
        }
      }
    }

    // Update the activity
    return await Model.findOneAndUpdate({ _id: id }, payload, { new: true });
  } catch (error) {
    throw new Error(`Error updating activity by ID: ${error.message}`);
  }
};
