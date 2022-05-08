import { RequestHandler } from "express";
import createHttpError from "http-errors";
import ExampleModal from "../models/ExampleModal";

export const getExample: RequestHandler = async (req, res, next) => {
  try {
    const {
      FilterColumn,
      PageNumber,
      PageSize,
    }: { FilterColumn: any; PageNumber: number; PageSize: number } = req.body;
    var query: any = {};
    query.skip = PageSize * (PageNumber - 1);
    query.limit = PageSize;
    let skip = PageSize * (PageNumber - 1);
    let limit = PageSize;
    //const filterData = await ExampleModal.find(FilterColumn[0]);
    //For pagination
    //const filterData = await ExampleModal.find({}, {}, query);
    //For Pagination with filter column
   const filterData = await ExampleModal.find(FilterColumn[0]).skip(skip).limit(limit);
    res.json({
      filterData: filterData,
      datalen: filterData.length,
    });
  } catch (error) {
    return next(createHttpError.NotFound);
  }
};

export const postExampleData: RequestHandler = async (req, res, next) => {
  try {
    //console.log('IExampleData',IExampleData);

    // const { Name, ID }: IExampleData = req.body;
    const {
      Name,
      ID,
      Number,
      Email,
      Address,
    }: {
      Name: string;
      ID: number;
      Number: number;
      Email: string;
      Address: string;
    } = req.body;
    const example = await ExampleModal.findOne({ Email });
    console.log("example", example);
    if (example) {
      return next(createHttpError(406, "Email Already exisits"));
    }
    const newExample = new ExampleModal({ Name, ID, Number, Email, Address });
    await newExample.save();
    res.json({ Name, ID, Number, Email, Address });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};
