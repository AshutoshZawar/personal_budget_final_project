const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ExpenceModel = require("../models/ExpenceModel");
const incomeModel = require("../models/incomeModel");
const randomColor = require("randomcolor");

exports.createIncome = catchAsyncErrors(async (req, res, next) => {
  const rgbaColor = randomColor({ format: "rgba", alpha: 0.2 });
  const bordercolor = randomColor({ format: "rgba", alpha: 0.7 });

  let body = req.body;
  body.bg_color = `${rgbaColor}`;
  body.border_color = `${bordercolor}`;
  body.user_id = req.user.id;

  const income = await incomeModel.create(body);

  res.status(201).json({
    success: true,
    income,
  });
});

exports.getIncome = catchAsyncErrors(async (req, res, next) => {
  // console.log('req.user.id', req.user.id)
  const userId = req.user.id;
  const income = await incomeModel.find({ user_id: userId });

  res.status(200).json({
    success: true,
    income,
  });
});

exports.createExpences = catchAsyncErrors(async (req, res, next) => {
  const rgbaColor = randomColor({ format: "rgba", alpha: 0.2 });
  const bordercolor = randomColor({ format: "rgba", alpha: 0.7 });

  let body = req.body;
  body.bg_color = `${rgbaColor}`;
  body.border_color = `${bordercolor}`;
  body.user_id = req.user.id;
  const expence = await ExpenceModel.create(body);

  res.status(201).json({
    success: true,
    expence,
  });
});

exports.getExpence = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.user)
  // console.log('req.user.id', req.user.id)
  const userId = req.user.id;
  const expence = await ExpenceModel.find({ user_id: userId });

  res.status(200).json({
    success: true,
    expence,
  });
});
