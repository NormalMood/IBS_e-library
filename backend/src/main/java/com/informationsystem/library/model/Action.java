package com.informationsystem.library.model;

import java.util.Map;
import static java.util.Map.entry;

public class Action {

    public static final Map<ActionsName, Short> ACTIONS = Map.ofEntries(
    		entry(ActionsName.TAKE, (short)1),
    		entry(ActionsName.RETURN, (short)2),
    		entry(ActionsName.EXTEND, (short)3)
    	);
    
}
