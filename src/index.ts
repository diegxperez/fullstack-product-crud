import pc from "picocolors";
import server from "./server";

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(pc.bgCyan(`REST API en el puerto ${PORT}`));
});
