const axios = require('axios');
const fs = require('fs');
const regex = /e2e/;
const getWorkflowOptions = {
	url: `https://circleci.com/api/v2/workflow/${process.env.CIRCLE_WORKFLOW_ID}/job`,
	method: 'GET'
};

axios(getWorkflowOptions).then(async (res) => {
	const jobsArray = res.data.items;
	for await (const job of jobsArray) {
		if (regex.test(job.name)) {
			getJobArtifactAndWriteToFile(job.job_number, job.name);
		}
	}
});

getJobArtifactAndWriteToFile = (jobId, fileName) => {
	const getJobArtifactsOptions = {
		url: `https://circleci.com/api/v2/project/gh/weareinreach/inreach-catalog/${jobId}/artifacts`,
		method: 'GET'
	};
	axios(getJobArtifactsOptions).then(async (res) => {
		const donwloadArtifactOptions = {
			url: res.data.items[0].url,
			method: 'GET'
		};
		axios(donwloadArtifactOptions).then((res) => {
			fs.writeFile(`../lcov-${fileName}.info`, res.data, (err) => {
				if (err) console.error(err);
			});
		});
	});
};
