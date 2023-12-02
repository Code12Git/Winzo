import CreateSession from "@/components/Session/CreateSession";
import SessionModal from "@/components/Session/SessionModal";
import GetSession from "@/components/Session/GetSession";
import Countdown from "@/components/Session/Countdown";
const page = () => {
	return (
		<div className="bg-gradient-to-br from-red-400 to-blue-500">
			<SessionModal />
			<GetSession />
		</div>
	);
};

export default page;
