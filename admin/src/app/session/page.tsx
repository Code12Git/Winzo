import CreateSession from "@/components/Session/CreateSession";
import SessionModal from "@/components/Session/SessionModal";
import Timer from "@/components/Session/Timer";
import GetSession from "@/components/Session/GetSession";
const page = () => {
	return (
		<div className="bg-gradient-to-br from-red-400 to-blue-500">
			<SessionModal />
			<div>
				<Timer />
			</div>
			<GetSession />
		</div>
	);
};

export default page;
