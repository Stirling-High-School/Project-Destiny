const formatWeightings = (availableWeightings) => {
    let unique = availableWeightings.filter((x, i, arr) => arr.findIndex(y => y.value === x.value && y.isDisabled === x.isDisabled) === i);
    unique.sort(
        function (a, b) {
            if (a.label === b.label) {
                if (a.isDisabled && b.isDisabled) {
                    return 0
                } else if (a.isDisabled) {
                    return -1
                } else {
                    return 1
                }
            }
            return a.label > b.label ? 1 : -1;
        });
    unique = [...new Map(unique.map(weight => [weight.value, weight])).values()]
    return unique
}

export default formatWeightings;