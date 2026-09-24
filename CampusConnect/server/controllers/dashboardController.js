import Resource from "../models/Resource.js";

export const getResources = async (
  req,
  res
) => {
  try {
    const resources =
      await Resource.find()
        .sort({ createdAt: -1 });

    res.json({ resources });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createResource = async (
  req,
  res
) => {
  try {
    const resource =
      await Resource.create({
        ...req.body,
        createdBy: req.user._id
      });

    res.status(201).json({
      message: "Resource created",
      resource
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteResource = async (
  req,
  res
) => {
  try {
    const resource =
      await Resource.findByIdAndDelete(
        req.params.id
      );

    if (!resource) {
      return res.status(404).json({
        message: "Resource not found"
      });
    }

    res.json({
      message: "Resource deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};