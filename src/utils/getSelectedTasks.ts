import selectFrom from '@inquirer/checkbox';

type TaskInfo = {
	checked: boolean;
	action: Function;
};

export default async function getSelectedTasks<T extends Record<K, TaskInfo>, K extends keyof T>(taskMap: T) {
	const taskNames = Object.keys(taskMap) as K[];

	return selectFrom({
		required: true,
		message: 'Select the items to setup',
		choices: taskNames.map(name => ({
			value: name,
			checked: taskMap[name].checked,
		})),
	});
}
