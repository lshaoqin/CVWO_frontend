import Tag from '../../types/Tag'

export type TagEntry = {
    name: string,
    weight: number,
    post_id: number,
    user_id: number,
}

interface Counter {
    [name: string]: [number, number]
}


function ProcessTags(tagEntries: TagEntry[]) {
    //count the weight and userWeight of each tag name.
    const tagcounts = tagEntries.reduce((counters: Counter, {name, weight, user_id}: TagEntry) => {
        //for each TagEntry, add its weight to 'weight' if not by the user (user_id == 0)
        if(user_id === 0) {
            if (counters[name]) {
                counters[name][0] += weight
            }
            else {
                counters[name] = [weight, 0]
            }
        }

        //add to 'userWeight' if it was by the user (user_id == 1)
        if(user_id === 1) {
            if (counters[name]) {
                counters[name][1] += weight
            }
            else {
                counters[name] = [0, weight]
            }
        }

        return counters
    }, {})

    //process output into a standard Tag object
    const tags: Tag[] = []
    for (const name in tagcounts) {
        tags.push({name: name, weight: tagcounts[name][0], userWeight: tagcounts[name][1]})
    }
    
    return tags;
}

export default ProcessTags