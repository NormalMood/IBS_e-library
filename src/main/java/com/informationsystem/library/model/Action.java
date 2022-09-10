package com.informationsystem.library.model;

import java.util.HashMap;
import java.util.Map;

public class Action {

    public static final Map<ActionsName, Integer> ACTIONS = new HashMap<ActionsName, Integer>(){{
        put(ActionsName.TAKE, 1);
        put(ActionsName.RETURN, 2);
        put(ActionsName.EXTEND, 3);
    }};

}
