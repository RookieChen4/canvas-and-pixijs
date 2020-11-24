const api = require("./api");
const emptyWidget = require("./widget/empty");
const smallWidget = require("./widget/small");
const mediumWidget = require("./widget/medium");

exports.init = async() => {
  const items = await api.fetch();
  $widget.setTimeline(ctx => {
    if (!items) {
      return emptyWidget();
    }
    switch (ctx.family) {
      case $widgetFamily.small:
        return smallWidget(ctx,items);
      case $widgetFamily.medium:
        return mediumWidget(ctx,items);
      case $widgetFamily.large:
        return mediumWidget(ctx,items);
    }
  });
}