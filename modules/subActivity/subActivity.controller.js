const updateById = async (id, payload) => {
  try {
    // Update the subactivity
    const subactivity = await Model.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });

    if (!subactivity) {
      throw new Error("Subactivity not found");
    }

    // Get the parent activity
    const activityId = subactivity.activity;
    const subactivities = await Model.find({ activity: activityId });

    // Check the completion status of all subactivities
    const allCompleted = subactivities.every((sub) => sub.isCompleted);
    const activityStatus = allCompleted;

    // Update the parent activity's completion status
    await activityModel.findOneAndUpdate(
      { _id: activityId },
      { isCompleted: activityStatus }
    );

    return subactivity;
  } catch (error) {
    throw new Error(`Error updating subactivity by ID: ${error.message}`);
  }
};
